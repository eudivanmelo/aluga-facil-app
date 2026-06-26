import { COLORS } from '@/constants/colors';
import React from 'react';
import {
    ActivityIndicator,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
} from 'react-native';
import { Typography } from '@/components/atoms/Typography';
import { labelStyles, styles } from './styles';


type Variant = 'primary' | 'outline' | 'secondary';

interface ButtonProps extends TouchableOpacityProps {
    label: string;
    variant?: Variant;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    loading?: boolean;
}

export function Button({
    label,
    variant = 'primary',
    leftIcon,
    rightIcon,
    loading = false,
    disabled,
    style,
    ...props
}: ButtonProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            disabled={disabled || loading}
            style={[
                styles.base,
                styles[variant],
                (disabled || loading) && styles.disabled,
                style,
            ]}
            {...props}
        >
            {loading ? (
                <ActivityIndicator
                    color={variant === 'primary' ? COLORS.primary[100] : COLORS.primary[500]}
                />
            ) : (
                <>
                    <View style={styles.icon}>{leftIcon ?? null}</View>

                    <Typography variant="body/medium" style={labelStyles[variant]}>
                        {label}
                    </Typography>

                    <View style={styles.icon}>{rightIcon ?? null}</View>
                </>
            )}
        </TouchableOpacity>
    );
}