import prisma from '@/prisma';
import userAction from './user.action';
import { genSalt, hash, compare } from 'bcrypt';
import { IUser } from '@/interfaces/user.interface';
import { sign } from 'jsonwebtoken';
import { HttpException } from '@/exceptions/http.exception';

function generateReferralCode(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

async function hashingPassword(password: string) {
    const salt = await genSalt(10);
    const hashedPass = await hash(password, salt);

    return hashedPass;
}

export class AuthAction {
    registerAction = async ({
        username,
        email,
        password,
        first_name,
        last_name,
        referral_code,
        point_balance,
        role_id,
    }: IUser) => {
        const prismaClient = prisma;

        try {
            const isDuplicate = await userAction.findUserByEmailOrUsername(
                username,
                email,
            );
            if (isDuplicate)
                throw new HttpException(500, 'Username or email already exists');

            const ownReferralCode = generateReferralCode(5);
            const hashedPass = await hashingPassword(password);

            const user = await prismaClient.$transaction(async (transaction) => {
                const newUser = await transaction.user.create({
                    data: {
                        username,
                        email,
                        password: hashedPass,
                        first_name,
                        last_name,
                        own_referral_code: ownReferralCode,
                        point_balance,
                        role_id,
                    },
                });

                if (referral_code) {
                    const referrer = await transaction.user.findUnique({
                        where: { own_referral_code: referral_code },
                    });

                    if (!referrer) {
                        throw new HttpException(500, 'Invalid referrer code');
                    }

                    const referrerId = referrer.user_id;
                    const newPointBalance = referrer.point_balance + 10000;

                    await transaction.user.update({
                        where: { user_id: referrerId },
                        data: { point_balance: newPointBalance },
                    });

                    const validUntil = new Date();
                    validUntil.setMonth(validUntil.getMonth() + 3);

                    await transaction.referral.create({
                        data: {
                            referral_code,
                            referrer_id: referrerId,
                            referred_id: newUser.user_id,
                            points_awarded: 10000,
                            valid_until: validUntil,
                        },
                    });

                    await transaction.userDiscount.create({
                        data: {
                            user_id: newUser.user_id,
                            discount_percentage: 10,
                            is_redeemed: false,
                        },
                    });
                }

                return newUser;
            });

            return user;
        } catch (error) {
            throw error;
        }
    };

    loginAction = async (username: string, password: string) => {
        try {
            const user = await userAction.findUserByUsername(username);

            if (!user) throw new HttpException(500, 'Incorrect email or password');
            
            const isPassValid = await compare(password, user.password);
            if (!isPassValid)
                throw new HttpException(500, 'Incorrect email or password');

            const payload = {
                userId: user.user_id,
                username: user.username,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                role_name: user.role.role_name,
                role_id: user.role_id,
                referral_code: user.own_referral_code,
                point_balance: user.point_balance,
            };

            const token = sign(payload, String(process.env.API_KEY), {
                expiresIn: '1hr',
            });

            return token;
        } catch (error) {
            throw error;
        }
    };

    refreshTokenAction = async (username: string) => {
        try {
            const user = await userAction.findUserByUsername(username);
            if (!user) throw new HttpException(500, 'Something went wrong');

            const payload = {
                userId: user.user_id,
                username: user.username,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                referral_code: user.own_referral_code,
                point_balance: user.point_balance,
                role_name: user.role.role_name,
                role_id: user.role_id,
            };

            const token = sign(payload, String(process.env.API_KEY), {
                expiresIn: '1hr',
            });

            return token;
        } catch (error) {
            throw error;
        }
    };
}