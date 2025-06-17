import { useRouter } from "next/router";
import { useEffect } from "react";

const MONOBANK_URL = "https://send.monobank.ua/jar/3famsaavyF";

export default function DonateConfirm() {
  const router = useRouter();
  const { amount, description } = router.query;

  useEffect(() => {
    if (!amount) {
      router.replace("/shop");
    }
  }, [amount, router]);

  const handleConfirm = () => {
    window.location.href = MONOBANK_URL;
  };

  if (!amount) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #232c36 0%, #2e3c4d 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 100,
        flexDirection: "column",
        boxSizing: "border-box",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          background: "#232c36",
          borderRadius: 18,
          boxShadow: "0 6px 32px #0005, 0 1.5px 8px #00ffb422",
          maxWidth: 370,
          width: "100%",
          padding: "38px 28px 32px 28px",
          textAlign: "center",
          color: "#fff",
          position: "relative",
        }}
      >
        <div
          style={{
            width: 70,
            height: 70,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #00ffb4 60%, #ffe066 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 18px auto",
            boxShadow: "0 2px 12px #00ffb422",
          }}
        >
          <img
            src="/logos/diamond.png"
            alt="donate"
            width={40}
            height={40}
            style={{ objectFit: "contain" }}
          />
        </div>
        <h2
          style={{
            fontWeight: 800,
            fontSize: 26,
            marginBottom: 10,
            letterSpacing: 0.5,
          }}
        >
          Підтвердження донату
        </h2>
        <div
          style={{
            fontSize: 17,
            marginBottom: 18,
            color: "#eafefc",
            opacity: 0.92,
            minHeight: 24,
          }}
        >
          Дякуємо за підтримку нашого серверу!
        </div>
        <div
          style={{
            background: "#181f26",
            borderRadius: 12,
            padding: "18px 0 14px 0",
            marginBottom: 18,
            boxShadow: "0 1px 6px #0002",
          }}
        >
          <div
            style={{
              fontSize: 15,
              color: "#00ffb4",
              marginBottom: 4,
            }}
          >
            Ви обрали донат на суму:
          </div>
          <div
            style={{
              fontWeight: 900,
              fontSize: 30,
              color: "#ffe066",
              textShadow: "0 2px 8px #0006",
              marginBottom: 2,
            }}
          >
            {amount} ₴
          </div>
          {description && (
            <div
              style={{
                fontSize: 14,
                color: "#fff",
                opacity: 0.85,
                marginTop: 4,
              }}
            >
              <span style={{ color: "#00ffb4" }}>Призначення:</span> {description}
            </div>
          )}
        </div>
        <button
          onClick={handleConfirm}
          style={{
            padding: "13px 0",
            width: "100%",
            fontSize: 18,
            fontWeight: 700,
            borderRadius: 10,
            background: "linear-gradient(90deg, #00ffb4 60%, #ffe066 100%)",
            color: "#232c36",
            border: "none",
            boxShadow: "0 2px 8px #00ffb422",
            cursor: "pointer",
            transition: "background 0.2s",
            marginBottom: 10,
          }}
        >
          Підтвердити та перейти до оплати
        </button>
        <div
          style={{
            fontSize: 13,
            color: "#eafefc99",
            marginTop: 8,
          }}
        >
          Після підтвердження ви перейдете на сторінку Monobank для завершення
          оплати.
        </div>
        <div
          style={{
            marginTop: 26,
            padding: "16px 10px 10px 10px",
            background: "#181f26",
            borderRadius: 10,
            boxShadow: "0 1px 6px #0002",
            color: "#ffe066",
            fontSize: 15,
            lineHeight: 1.6,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              color: "#ff6b6b",
              marginBottom: 6,
              fontSize: 16,
            }}
          >
            Альтернативна оплата
          </div>
          <div style={{ color: "#fff", marginBottom: 4 }}>
            Якщо Monobank-банка не працює, ви можете надіслати донат напряму на
            картку:
          </div>
          <div
            style={{
              fontWeight: 800,
              fontSize: 20,
              letterSpacing: 2,
              color: "#00ffb4",
              background: "#232c36",
              borderRadius: 7,
              padding: "7px 0",
              margin: "8px 0",
            }}
          >
            5375&nbsp;4112&nbsp;0578&nbsp;7331
          </div>
          <div
            style={{
              color: "#eafefc",
              fontSize: 13,
              marginTop: 4,
            }}
          >
            <span role="img" aria-label="info">
              💳
            </span>{" "}
            Обов'язково вкажіть у коментарі до платежу ваш нікнейм!
          </div>
        </div>
      </div>
      <style jsx global>{`
        @media (max-width: 600px) {
          div[style*="maxWidth: 370"] {
            max-width: 98vw !important;
            padding: 18px 2vw 18px 2vw !important;
          }
        }
      `}</style>
    </div>
  );
}
