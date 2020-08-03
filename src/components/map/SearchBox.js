import React, {Fragment, useRef, useState, useEffect} from 'react';
import styled from 'styled-components';
import SearchResult from "components/map/SearchResult";

const SearchBoxWrapper = styled.div`
  position: absolute;
  background-color: white;
  filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  top: 20px;
  left: 8px;
  // right: 8px;
  min-width: 100px;
  z-index: 10;
`;


const NavigationWrapper = styled.div`
  position: absolute;
  background-color: white;
  filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  top: 20px;
  left: 8px;
  // right: 8px;
  min-width: 100px;
  z-index: 10;
`;


const InputBoxBlock = styled.div`
    width: 300px;
`;

function SearchBox({mapInstance, ref}) {
  const [text, setText] = useState('');
  const [visible, setVisible] = useState(false);
  const searchRef = useRef(null);
  const onChange = e => {
    const {value} = e.target;
    setText(value);
  }

  useEffect(() => {
    if (mapInstance) {
      // something!
    }

    return () => {};
  }, [searchRef, mapInstance]);

  const onSearch = e => {
    e.preventDefault();
    e.stopPropagation();
  };


  const onNavigation = () => {
    setVisible(!visible);
  };

const handleChange = e => {
  console.log(e.target.value);
  const { value } = e.target;
  setText(value);
}

  return (
    <Fragment ref={searchRef}>
      {!visible ? (
          <SearchBoxWrapper>
            <InputBoxBlock>
              <form onSubmit={onSearch} autoComplete='off'>
                {/*<label>장소, 주소 검색</label>*/}
                <input
                  style={{ width: '300px'}}
                  name="query"
                  value={text}
                  onChange={onChange}
                  placeholder="장소, 주소 검색"
                  onChange={handleChange}
                />
                <button onClick={onSearch}>지도 검색</button>
                <button onClick={onNavigation}>위치 탐색</button>
              </form>
            </InputBoxBlock>
            <SearchResult list={[]}/>
          </SearchBoxWrapper>
        ) :
        (
          <NavigationWrapper>
            <h3>경로 탐색</h3>
            <div onClick={() => setVisible(!visible)}>x</div>
            <input name=""/>
            <input name=""/>
            <select name="">
              <option value="car">자동차로 이동</option>
              <option value="walk">도보로 이동</option>
            </select>
          </NavigationWrapper>
        )
      }
    </Fragment>
  );
}

export default SearchBox;
