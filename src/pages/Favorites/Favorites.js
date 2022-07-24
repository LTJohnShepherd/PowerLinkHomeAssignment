import React, { useState, useEffect, useRef } from "react";
import Text from "components/Text";
import FavoriteUserList from "components/FavoriteUsersList";
import * as S from "./style";

const Favorites = ({ favoriteusers }) => {
    return (
        <S.Favorites>
            <S.Content>
                <S.Header>
                    <Text size="64px" bold>
                        FavoritePeople
                    </Text>
                </S.Header>
                <FavoriteUserList users={favoriteusers} />
            </S.Content>
        </S.Favorites>
    );
}

export default Favorites;