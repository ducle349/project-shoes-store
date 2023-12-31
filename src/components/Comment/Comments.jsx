import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-stars";

import { CaretDownOutlined } from "@ant-design/icons";
import { Alert } from "antd";
import {
  actAddComment,
  actGetAllComments,
} from "../../redux/features/Comments/CommentsSlice";

const RenderComments = (props) => {
  const [rate, setRate] = useState();
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const [showRate, setShowRate] = useState(false);
  const { productComments } = useSelector((state) => state.comment);
  useEffect(() => {
    dispatch(
      actGetAllComments({
        productId: props.productDetails.id,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.productDetails.id, comment, rate]);

  const handleSendComments = () => {
    const _Comments = {
      rate: rate || 0,
      productId: props.productDetails.id,
      email: props.userProfile.email,
      fullName: props.userProfile.name,
      commentsContent: comment,
      createdAt: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
    };
    if (props.isAuth) {
      if (comment === "") {
        <Alert
          message="Warning"
          description="Bình luận trống."
          type="warning"
          showIcon
          closable
        />;
        alert("Bình luận trống");
      } else {
        dispatch(actAddComment(_Comments));
        setComment("");
      }
    } else {
      alert("Bạn chưa đăng nhập. Vui lòng đâng nhập để đánh giá sản phẩm");
      <Alert
        message="Warning"
        description="Bạn chưa đăng nhập. Vui lòng đâng nhập để đánh giá sản phẩm"
        type="warning"
        showIcon
        closable
      />;
    }
  };

  const averageRate = (
    productComments
      ?.map((item) => (item.rate > 0 ? item.rate : ""))
      .reduce((total, num) => {
        return total + Number(num);
      }, 0) / productComments?.filter((item) => item.rate > 0).length
  ).toFixed(1);

  const renderDetailsStar = () => {
    let starDetails = [];
    for (let i = 1; i <= 5; i++) {
      starDetails
        .push(
          productComments
            ?.map((item) => item.rate < i + 1 && item.rate >= i)
            .reduce((total, num) => {
              return total + Number(num);
            }, 0)
        )
        .toFixed(1);
    }

    return starDetails.map((star, index) => {
      return (
        <>
          <div className="d-flex align-items-center ">
            <ReactStars count={5} size={20} value={index + 1} edit={false} />
            <span className="align-middle g-3">{star} đánh giá</span>
          </div>
        </>
      );
    });
  };

  const listComments = (data) => {
    if (data?.length === 0) {
      return <p>Chưa có bình luận nào từ khách hàng</p>;
    } else {
      return data?.map((item) => {
        return (
          <>
            <div key={item.id}>
              <p className="fst-italic m-0">{item.fullName}</p>
              <ReactStars value={item.rate} edit={false} size={20} />

              <p className="m-0">{item?.commentsContent}</p>
              <p className="text-right fst-italic">
                Bình luận lúc: {item?.createdAt}
              </p>
            </div>
          </>
        );
      });
    }
  };

  return (
    <div className="border p-3">
      <div className="row m-0">
        <div className="col-sm-6 p-0">
          <h4>Đánh giá sản phẩm</h4>
          <ReactStars
            count={5}
            size={40}
            value={rate ? rate : 0}
            onChange={setRate}
          />
        </div>
        <div className="col-sm-6">
          <h4>Đánh giá: {isNaN(averageRate) ? 0 : averageRate}/5 </h4>
          <ReactStars count={5} size={25} value={averageRate} edit={false} />
          <p>
            {" "}
            Có {productComments?.filter((item) => item.rate >= 0).length} đánh
            giá / {productComments?.length} bình luận
            <CaretDownOutlined
              className="text-success"
              style={showRate ? { rotate: "180deg" } : { rotate: "" }}
              onClick={() => {
                showRate ? setShowRate(false) : setShowRate(true);
              }}
            />
          </p>
          <div style={showRate ? { display: "" } : { display: "none" }}>
            {renderDetailsStar()}
          </div>
        </div>
      </div>
      <form>
        <textarea
          placeholder="Nhận xét về sản phẩm"
          className="w-100 form-control my-3"
          maxLength={100}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <div className="text-right align-right">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              handleSendComments();
            }}
          >
            Gửi
          </button>
        </div>
      </form>
      <div>
        <h5 className="m-0 mt-2">Khách hàng đánh giá:</h5>
        <div
          className="border p-3 bg-light"
          style={{ height: "100%", maxHeight: 200, overflowY: "scroll" }}
        >
          {listComments(productComments)}
        </div>
      </div>
    </div>
  );
};

export default RenderComments;
