import React, { useEffect } from "react";
import "../styles/mainSeries.scss";
import Header from "../components/Header";
import axios from "axios";
import { baseSeriesUrl, ethToUsd } from "../constant";
import { useNavigate, useParams } from "react-router-dom";
import Syncer from "../components/Syncer";
import "../styles/Featured.scss";
import Footer from "../components/Footer";

const MainSeries = () => {
  const [main_data, set_data] = React.useState();
  const navigate = useNavigate();
  const id = useParams().id;
  const fetch_data = async () => {
    await axios.get(`${baseSeriesUrl}/get/${id}`).then((res) => {
      set_data(res.data.data);
    });
  };
  useEffect(() => {
    fetch_data();
  });

  const sumArtPrices = (artArray) => {
    let totalPrice = 0;
    artArray?.forEach((artObject) => {
      if (artObject?.price) {
        totalPrice += artObject?.price;
      }
    });
    return totalPrice;
  };
  const totalPricesSum = sumArtPrices(main_data?.art);
  return (
    <div className="series-wrap flex col">
      <Header />
      {main_data == undefined ? (
        <Syncer />
      ) : (
        <div className="series-main flex col">
          <div className="top">
            <img src={main_data?.image} className="main-img" alt="" />
            <div className="info flex col">
              <h1>{main_data?.title}</h1>
              <div
                className="owner-wrap flex"
                onClick={() => navigate(`/user/${main_data?.owner?._id}`)}
              >
                <img src={main_data?.owner?.avatar} alt="" />
                <h2>{main_data?.owner?.username}</h2>
              </div>
              <h2>
                Total Worth{" "}
                <span>
                  {" "}
                  {totalPricesSum} ≈ ${ethToUsd * totalPricesSum}
                </span>{" "}
              </h2>
              <button>Buy All</button>
            </div>
          </div>
          <div className="bottom featured flex">
            {main_data == undefined ? (
              <Syncer />
            ) : (
              <div className="featured-card flex">
                {main_data?.art?.map((card_item) => {
                  return (
                    <div className="card-item flex col" key={card_item._id}>
                      <div className="img-sect flex">
                        <img
                          src={card_item?.image}
                          alt=""
                          onClick={() =>
                            navigate(`/art/${card_item?._id}`) +
                            window.location.reload()
                          }
                        />
                      </div>
                      <h2
                        style={{
                          fontSize: "1rem",
                          fontWeight: 400,
                          paddingLeft: "10px",
                        }}
                      >
                        {card_item?.title}
                      </h2>
                      <div className="price flex col">
                        <p>PRICE</p>
                        <h2>
                          {card_item?.price} ≈{" "}
                          <span>
                            ${Math.round(ethToUsd * card_item?.price)}
                          </span>
                        </h2>
                      </div>
                      <div className="line"></div>
                      <div
                        className="profile flex"
                        onClick={() =>
                          navigate(`/user/${card_item?.owner?._id}`)
                        }
                      >
                        <div className="left flex">
                          <img src={main_data?.owner?.avatar} alt="" />
                          <div className="info flex col">
                            <h2>{main_data?.owner?.username}</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default MainSeries;
