import React, { useEffect, useState, useRef } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const UserList = ({ users, favoritedusers, setFavoriteusers, isLoading, listRef, scrollToBottom }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [newFilteredUsers, setnewFilteredUsers] = useState([]);
  const [displayedUsers, setdisplayedUsers] = useState(users);

  const applyFilter = (tag) => {
    users.forEach((user, index) => {
      if (user.nat === tag) {
        setnewFilteredUsers(newFilteredUsers => [...newFilteredUsers, user]);
      }
    })
  }

  const removeFilter = (tag) => {
    newFilteredUsers.forEach((user, index) => {
      setnewFilteredUsers(newFilteredUsers.filter(user => user.nat !== tag));
    })
  }

  useEffect(() => {
    if (newFilteredUsers.length > 0) {
      setdisplayedUsers(newFilteredUsers)
    }
    else {
      setdisplayedUsers(users)
    }
  }, [newFilteredUsers, users])

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("favoritedusers"));
    if (storedUsers) {
      setFavoriteusers(storedUsers)
    }
  }, []);

  const addFavorite = (user) => {
    if (favoritedusers.find(u => u.login.uuid === user.login.uuid)) {
      removeFavorite(user)
    }
    else {
      setFavoriteusers([...favoritedusers, user]);
      localStorage.setItem("favoritedusers", JSON.stringify([...favoritedusers, user]))
    }
  };

  const removeFavorite = (user) => {
    const filteredUsers = favoritedusers.filter(u => u !== user)
    setFavoriteusers(filteredUsers);
    localStorage.setItem("favoritedusers", JSON.stringify(filteredUsers))
  }

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };
  return (
    <S.UserList >
      <S.Filters >
        <CheckBox value="BR" label="Brazil" applyF={applyFilter} removeF={removeFilter} />
        <CheckBox value="AU" label="Australia" applyF={applyFilter} removeF={removeFilter} />
        <CheckBox value="CA" label="Canada" applyF={applyFilter} removeF={removeFilter} />
        <CheckBox value="DE" label="Germany" applyF={applyFilter} removeF={removeFilter} />
        {/* Bonus from Task 1: add a new filter */}
        <CheckBox value="RU" label="Russia" applyF={applyFilter} removeF={removeFilter} />
      </S.Filters>
      <S.List onScroll={() => scrollToBottom()} ref={listRef}>
        {

          [... new Set([...favoritedusers, ...displayedUsers])].map((user, index) => {
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
                <S.IconButtonWrapper isVisible={index === hoveredUserId || favoritedusers.find(u => u.login.uuid === user.login.uuid)}>
                  <IconButton onClick={(e) => {
                    addFavorite(user)
                  }}>
                    <FavoriteIcon color="error" />
                  </IconButton>
                </S.IconButtonWrapper>
              </S.User>
            );
          })
        }
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList >
  );
};

export default UserList;
