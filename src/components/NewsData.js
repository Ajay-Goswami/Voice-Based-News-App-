/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { getNews } from "../service/getNews";
import moment from "moment";

export default function NewsData() {
  const [newsData, setNewsData] = useState([]);
  const [selectOption, setSelectOption] = useState("");
  const alanKey =
    "58f462a92ce2770ae3c799282ec7644e2e956eca572e1d8b807a3e2338fdd0dc/stage";
  const getAllNews = async () => {
    let data = await getNews(selectOption);
    setNewsData(data.data.articles);
  };

  const selectCategory = (event) => {
    setSelectOption(event.target.value);
  };

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: (commandData) => {
        setSelectOption(commandData.data);
      },
    });
  }, []);

  useEffect(() => {
    getAllNews();
  }, [selectOption]);
  //   console.log(newsData?.data?.articles);
  return (
    <div className="main">
      <div className="header">
        <div>
          <img
            src="https://pluspng.com/img-png/news-update-png--1097.png"
            className="logo-img"
            alt="logo"
          />
        </div>

        <div className="select">
          <label htmlFor="news">Choose a Category</label>
          <select
            className="select-box"
            name="category"
            id="category"
            onChange={selectCategory}
            value={selectOption}
          >
            <option value="General">General</option>
            <option value="health">health</option>
            <option value="Business">Business</option>
            <option value="Technology">Technology</option>
            <option value="Sports">Sports</option>
            <option value="Science">Science</option>
            <option value="entertainment">Entertainment</option>
          </select>
        </div>
      </div>

      <div className="grid-main">
        {newsData?.map((news) => {
          return (
            <div className="grid-child">
              <img className="news-image" src={news?.urlToImage} alt="image" />
              <p className="news-title">{news?.title}</p>
              <p className="news-content">{news?.content}</p>
              <div className="space-btw">
                <p className="news-author">
                  Author:{" "}
                  {news?.author ? news?.author : "Author name is not available"}
                </p>
                <p className="news-date">
                  Date: {moment(news?.publishedAt).format("LL")}
                </p>
              </div>

              <a href={news?.url} target="_blank" rel="noreferrer">
                Read More...
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
