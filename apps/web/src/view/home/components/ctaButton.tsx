import { Button } from '@mui/joy';
import Link from 'next/link';

interface CtaButtonProps {
    href: string;
    buttonText: string;
}

function CtaButton({ href, buttonText }: CtaButtonProps) {
    return (
        <Link href={href}>
            <Button
                variant="solid"
                size="lg"
                sx={{
                    mt: 2,
                    width: { xs: '40%', sm: '35%', md: '25%' },
                    backgroundColor: '#ff4703',
                    color: '#fff',
                    borderRadius: '50px'
                }}
            >
                {buttonText}
            </Button>
        </Link>
    );
}

export default CtaButton;