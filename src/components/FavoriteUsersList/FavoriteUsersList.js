import React, { useEffect, useState, useRef } from "react";
import Text from "components/Text";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const FavoriteUserList = ({ users }) => {
    const [hoveredUserId, setHoveredUserId] = useState();
    const [displayedUsers, setdisplayedUsers] = useState(users);

    const removeFavorite = (Favorite) => {
        displayedUsers.forEach((user, index) => {
            setdisplayedUsers(displayedUsers.filter(user => user !== Favorite));
        })
    };

    useEffect(() => {
        localStorage.setItem("favoritedusers", JSON.stringify(displayedUsers))
    }, [displayedUsers]);

    const handleMouseEnter = (index) => {
        setHoveredUserId(index);
    };

    const handleMouseLeave = () => {
        setHoveredUserId();
    };
    return (
        <S.UserList >
            <S.List>
                {
                    displayedUsers.map((user, index) => {
                        return (
                            <S.User
                                key={index}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <S.UserPicture src={user?.picture.large} alt="" />
                                <S.UserInfo>
                                    <Text size="22px" bold>
                                        {user?.name.title} {user?.name.first} {user?.name.last}
                                    </Text>
                                    <Text size="14px">{user?.email}</Text>
                                    <Text size="14px">
                                        {user?.location.street.number} {user?.location.street.name}
                                    </Text>
                                    <Text size="14px">
                                        {user?.location.city} {user?.location.country}
                                    </Text>
                                </S.UserInfo>
                                <S.IconButtonWrapper isVisible={index === hoveredUserId || users.find(u => u.login.uuid === user.login.uuid)}>
                                    <IconButton onClick={(e) => {
                                        removeFavorite(user)
                                    }}>
                                        <FavoriteIcon color="error" />
                                    </IconButton>
                                </S.IconButtonWrapper>
                            </S.User>
                        );
                    })
                }
            </S.List>
        </S.UserList >
    );
};

export default FavoriteUserList;
