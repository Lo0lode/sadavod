import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";

import BetterLink from "./BetterLink";
import { ChevronDownIcon, CloseIcon } from "../assets/icons";
import { db } from "../services/firebase-config";
import Modal from "./Modal";
import QuantityPicker from "./QuantityPicker";
import { getFormattedCurrency } from "../utils/getFormattedCurrency";
import { cartActions } from "../store/cartSlice";

const Div = styled.div`
  font-size: 14px;
  border: 1px #eee solid;
  width: 420px;
  margin-bottom: 16px;

  .item {
    display: flex;
    align-items: center;
    position: relative;

    a {
      text-decoration: none;
      color: inherit;
      display: block;
      width: 110px;
    }

    .info {
      padding: 8px;

      .brand {
        font-weight: 500;
      }

      .name {
        color: #777;
        margin-top: 8px;
      }

      .actions {
        margin: 16px 0;
        display: flex;

        button {
          background-color: #eee;
          font: inherit;
          font-size: 13px;
          font-weight: 500;
          padding: 3px 12px;
          border: none;
          border-radius: 4px;
          outline: none;

          &:first-child {
            margin-right: 8px;
          }

          &.quantity {
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 3px 3px 3px 12px;

            .icon {
              margin-left: 3px;
              width: 14px;
              height: 14px;
              stroke-width: 2;
            }
          }
        }
      }

      .amount {
        font-weight: 500;
        display: flex;
        align-items: center;

        .icon {
          width: 14px;
          height: 14px;
          margin: 2px 4px 0 4px;
          stroke-width: 2px;
        }
      }
    }

    .delete {
      border: none;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2px;
      position: absolute;
      top: 8px;
      right: 8px;
      z-index: 5;
      background-color: white;
      cursor: pointer;

      .icon {
        width: 16px;
        height: 16px;
        stroke-width: 2px;
      }
    }
  }

  .cart {
    font: inherit;
    font-weight: 500;
    background-color: white;
    color: #4a00e0;
    display: block;
    outline: none;
    cursor: pointer;
    border: none;
    border-top: 1px #eee solid;
    padding: 8px;
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 340px;
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const ModalDiv = styled.div`
  padding: 16px;

  .title {
    color: #4a00e0;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 32px;
  }

  .quantities {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-row-gap: 8px;

    button {
      font: inherit;
      font-size: 14px;
      font-weight: 500;
      border: 1px #ddd solid;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      margin-right: 8px;
      background-color: white;
      cursor: pointer;

      &.active {
        border-color: #4a00e0;
        color: #4a00e0;
      }

      &:last-child {
        margin-right: 0;
      }

      @media (hover: hover) {
        transition: border 240ms;

        &:hover {
          border-color: #4a00e0;
        }
      }
    }
  }
`;

const CartItemCard = ({
  index,
  id,
  size,
  imageURL,
  brand,
  name,
  amount,
  quantity,
}) => {
  const dispatch = useDispatch();
  console.log(amount, "123612");

  return (
    <>
      <Div>
        <div className="item">
          <BetterLink href={`/collections/${id}`}>
            <Image
              src={imageURL}
              width={110}
              height={138}
              layout="responsive"
            />
          </BetterLink>
          <div className="info">
            <div className="brand">{brand}</div>
            <div className="name">{name}</div>

            <div className="amount">
              <span>{quantity}</span>
              <span>{` ${getFormattedCurrency(amount)} Рублей`}</span>
            </div>
          </div>
        </div>
        <span
          style={{ marginLeft: 150 }}
          onClick={() => {
            dispatch(cartActions.removeItem({ itemId: id }));
          }}
        >
          Удалить из корзины(тык)
        </span>
      </Div>
    </>
  );
};

export default CartItemCard;
