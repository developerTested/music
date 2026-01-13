import React, { useEffect, useState } from 'react';
import artistService from '@/service/ArtistService';
import { Button } from './forms';
import { toast } from 'react-toastify';

type FollowButtonProps = React.ComponentProps<"button"> & {
    artistId?: string,
    variant?: "default" | "primary" | "secondary" | "success" | "danger" | "info" | "warning" | "icon";
    size?: "default" | "icon" | "sm" | "md" | "base" | "lg" | "xl";
    startIcon?: React.ReactElement,
    endIcon?: React.ReactElement,
}

export default function FollowButton({ artistId, variant, size, ...props }: FollowButtonProps) {
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggleFollow = async () => {

        if (!artistId) {
            toast.error("Invalid Artist");

            return false;
        }

        setLoading(true);
        try {
            if (isFollowing) {
                await artistService.unFollow(artistId);
            } else {
                await artistService.follow(artistId);
            }
            setIsFollowing(!isFollowing);
        } catch (err) {
            console.error('Follow/unfollow failed', err);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {

        if (!artistId) {
            return;
        }

        const fetchStatus = async () => {

            setLoading(true);

            try {
                const response = await artistService.checkFollowStatus(artistId);

                setIsFollowing(response.data.followed)
            } catch (error) {
                console.error("Failed to fetch follow status:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchStatus()


        return () => {
            setIsFollowing(false)
        }
    }, [artistId])


    return (
        <Button variant={variant} size={size} onClick={toggleFollow} disabled={loading} {...props}>
            {loading ? 'Processing...' : isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
    );
};