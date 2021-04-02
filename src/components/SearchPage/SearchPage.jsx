import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Empty, Row, Col, Input, Pagination, Result } from "antd";
import MovieCard from "../MovieCard/MovieCard.jsx";

const { Search } = Input;

// eslint-disable-next-line import/no-anonymous-default-export
const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [retrivalError, setRetrievalError] = useState(false);
  const [imageBaseUrl, setImageBaseUrl] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const getBaseUrl = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/configuration?api_key=${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.json();
      setImageBaseUrl(data.images.secure_base_url);
    } catch (e) {
      // Do nothing
    }
  };

  useEffect(
    () => {
      if (!imageBaseUrl) getBaseUrl();
    },
    [imageBaseUrl]
  );

  const onSearch = useCallback(
    () => {
      if (searchTerm) {
        try {
          setSearchData(null);
          setRetrievalError(false);
          (async () => {
            const response = await fetch(
              `https://api.themoviedb.org/3/search/movie?query=
              ${encodeURIComponent(searchTerm)}&api_key=${process.env.REACT_APP_API_KEY}`
            );
            const data = await response.json();
            setSearchData(data.results);
            setPageNum(1);
            setTotalResults(data.total_pages);
          })();
        } catch (e) {
          setRetrievalError(true);
          setIsLoading(false);
        }
      }
    },
    [searchTerm]
  );

  const onLoadPage = page => {
    try {
      (async () => {
        if (searchTerm) {
          setSearchData(null);
          setRetrievalError(false);
          setPageNum(page);
          const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=
            ${encodeURIComponent(searchTerm)}&api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
          );
          const data = await response.json();
          setSearchData(data.results);
        }
      })();
    } catch (e) {
      setRetrievalError(true);
      setIsLoading(false);
    }
  };

  useEffect(
    () => {
      onSearch();
    },
    [searchTerm, onSearch]
  );

  useEffect(
    () => {
      if (searchData && isLoading) {
        setIsLoading(false);
      }
    },
    [searchData, isLoading]
  );

  return (
    <Fragment>
      <Row style={{ justifyContent: "center", paddingBottom: "1rem" }}>
        <Col xs={24} md={12}>
          <Search
            placeholder="Enter a movie title"
            onSearch={() => {
              setIsLoading(true);
              onSearch();
            }}
            onChange={event => {
              setIsLoading(true);
              setTimeout(() => {
                if (event.target.value !== searchTerm) {
                  setSearchTerm(event.target.value);
                }
              }, 3000);
            }}
            loading={isLoading}
          />
        </Col>
      </Row>
      {searchData &&
        searchData.length === 0 &&
        <Empty description="No movies matched your query" />}
      {retrivalError
        ? <Result
            title="Error"
            subTitle="Something went wrong. Please try again later"
          />
        : searchData &&
            searchData.length > 0 &&
            <Fragment>
              <Row>
                {searchData.map(movie => (
                  <Col xs={24} md={8} key={movie.id}>
                    <MovieCard baseUrl={imageBaseUrl} {...movie} />
                  </Col>
                ))}

              </Row>
              <div style={{ paddingTop: "1rem" }}>
                <Pagination
                  total={totalResults}
                  current={pageNum}
                  onChange={page => {
                    setIsLoading(true);
                    onLoadPage(page);
                  }}
                  showSizeChanger={false}
                />
              </div>
            </Fragment>}
    </Fragment>
  );
};

export default SearchPage;
