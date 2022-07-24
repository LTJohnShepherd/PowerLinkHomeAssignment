import React, { useState, useEffect, useRef } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";

const Home = ({ favoriteusers, setFavoriteusers }) => {
  let param = 1;
  const { users, isLoading, fetchUsers } = usePeopleFetch(param);
  const [counter, setcounter] = useState(1);

  {/*  Task 3: infinite scrolling */ }
  const listInnerRef = useRef();
  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setcounter(counter + 1);
        console.log(counter);
      }
    }
  };

  useEffect(() => {
    fetchUsers(param);
  }, [counter])
  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList users={users} favoritedusers={favoriteusers} setFavoriteusers={setFavoriteusers} isLoading={isLoading} listRef={listInnerRef} scrollToBottom={onScroll} />
      </S.Content>
    </S.Home>
  );
};

export default Home;
