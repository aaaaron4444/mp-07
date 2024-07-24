/*
  Warnings:

  - You are about to drop the `discountcategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `promotion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ticket_type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `promotion` DROP FOREIGN KEY `Promotion_discount_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `promotion` DROP FOREIGN KEY `Promotion_event_id_fkey`;

-- DropTable
DROP TABLE `discountcategory`;

-- DropTable
DROP TABLE `promotion`;

-- DropTable
DROP TABLE `ticket_type`;

-- CreateTable
CREATE TABLE `Transaction` (
    `transaction_id` INTEGER NOT NULL AUTO_INCREMENT,
    `event_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `number_of_ticket` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `final_price` DOUBLE NOT NULL,
    `discount_applied` DOUBLE NOT NULL,
    `earlybird_applied` DOUBLE NOT NULL,
    `points_redeemed` INTEGER NOT NULL,
    `ticket_status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`transaction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserDiscount` (
    `discount_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `discount_percentage` DECIMAL(65, 30) NOT NULL,
    `is_redeemed` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `UserDiscount_user_id_idx`(`user_id`),
    PRIMARY KEY (`discount_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Event`(`event_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserDiscount` ADD CONSTRAINT `UserDiscount_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
