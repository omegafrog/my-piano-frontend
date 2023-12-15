import { useContext, useEffect, useRef, useState } from "react";
import {
  PaymentWidgetInstance,
  loadPaymentWidget,
  ANONYMOUS,
} from "@tosspayments/payment-widget-sdk";
import axios from "axios";
import { UserContext } from "../User-context";
import { createCashOrder } from "../AxiosUtil";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { param } from "jquery";

const clientKey = "test_ck_kYG57Eba3G6jzE0Rmam58pWDOxmA";
const customerKey = "OECBFXtWmvdXZEnYR_pCJ";

export default function CheckoutPage() {
  const [params] = useSearchParams();
  const [price, setPrice] = useState(Number(params.get("amount")));
  const paymentMethodsWidgetRef = useRef(null);
  const paymentWidgetRef = useRef(null);
  const context = useContext(UserContext);
  useEffect(() => {
    (async () => {
      // ------  결제위젯 초기화 ------
      // 비회원 결제에는 customerKey 대신 ANONYMOUS를 사용하세요.
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey); // 회원 결제
      // const paymentWidget = await loadPaymentWidget(clientKey, ANONYMOUS)  // 비회원 결제

      // ------  결제 UI 렌더링 ------
      // 결제 UI를 렌더링할 위치를 지정합니다. `#payment-method`와 같은 CSS 선택자와 결제 금액 객체를 추가하세요.
      // DOM이 생성된 이후에 렌더링 메서드를 호출하세요.
      // https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        "#payment-widget",
        { value: price },
        // 렌더링하고 싶은 결제 UI의 variantKey
        // 아래 variantKey는 문서용 테스트키와 연동되어 있습니다. 멀티 UI를 직접 만들고 싶다면 계약이 필요해요.
        // https://docs.tosspayments.com/guides/payment-widget/admin#멀티-결제-ui
        { variantKey: "DEFAULT" }
      );

      // ------  이용약관 UI 렌더링 ------
      // 이용약관 UI를 렌더링할 위치를 지정합니다. `#agreement`와 같은 CSS 선택자를 추가하세요.
      // https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자-옵션
      paymentWidget.renderAgreement(
        "#agreement",
        { variantKey: "AGREEMENT" } // 기본 이용약관 UI 렌더링
      );
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
      paymentWidgetRef.current = paymentWidget;
    })();
  }, []);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }
    setPrice(Number(params.get("amount")));
    // ------ 금액 업데이트 ------
    // 새로운 결제 금액을 넣어주세요.
    // https://docs.tosspayments.com/reference/widget-sdk#updateamount결제-금액
    paymentMethodsWidget.updateAmount(price);
  }, [price]);

  return (
    <div>
      <h1>캐시 결제</h1>
      <h3>
        <span>{`${price.toLocaleString()}원`}</span>
      </h3>
      <div id="payment-widget" />
      <div id="agreement" />
      <button
        onClick={async () => {
          const paymentWidget = paymentWidgetRef.current;

          try {
            // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
            // 더 많은 결제 정보 파라미터는 결제위젯 SDK에서 확인하세요.
            // https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보

            await paymentWidget?.requestPayment({
              orderId: params.get("orderId"),
              orderName: `캐시 ${price}원 결제`,
              customerName: context.loggedUser.name,
              customerEmail: context.loggedUser.email,
              amount: price,
              successUrl: `${window.location.origin}/cash/confirm`,
              failUrl: `${window.location.origin}/fail`,
            });
          } catch (error) {
            // 에러 처리하기
            console.error(error);
          }
        }}
      >
        결제하기
      </button>
    </div>
  );
}
