import * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { Toast } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

interface ToastItem {
  title: string;
  content: string;
  timestamp?: number;
}

type Push = (item: ToastItem) => void;
type Spread = () => JSX.Element;

type Reducer = ReturnType<typeof reducer>;
const reducer = () => {
  const [store, setStore] = useState<ToastItem[]>([]);

  const push: Push = (item) => {
    item.timestamp = Date.now();
    setStore((prev) => prev.concat(item));
  };

  const spread: Spread = () => {
    return (
      <>
        {!!store.length &&
          store.map((item) => {
            return <ToastComponent {...item} key={item.timestamp} />;
          })}
      </>
    );
  };

  const operation = { push, spread };
  return { operation };
};

const ToastContext = createContext<Reducer | null>({} as Reducer);

const ToastComponent = ({ title, content, timestamp }: ToastItem) => {
  const [time, setTime] = useState<number>();
  const [show, setShow] = useState(true);

  const calcTime = () => {
    const result = Math.floor((Date.now() - timestamp) / 1000 / 60);
    setTime(result);
  };

  useEffect(() => {
    calcTime();
    setTimeout(() => calcTime(), 60 * 1000);
  }, []);

  return (
    <>
      <Toast onClose={() => setShow(false)} show={show} autohide delay={5000}>
        <Toast.Header>
          <strong>{title}</strong>
        </Toast.Header>
        <Toast.Body>
          {content}
          {/* <small className="absolute right-0">{`${time} min ago`}</small> */}
        </Toast.Body>
      </Toast>
    </>
  );
};

export const GetToastComponent = () => {
  const { operation } = useToastContext();
  return (
    <>
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "relative",
          minHeight: "100px",
        }}
      >
        <div
          className="fixed bottom-4 right-4"
          // style={{
          //   position: "fixed",
          //   top: 0,
          //   right: 0,
          // }}
        >
          {operation.spread()}
        </div>
      </div>
    </>
  );
};

export const ToastProvider: React.FC = ({ children }) => {
  const useHooks = reducer();

  return (
    <ToastContext.Provider value={useHooks}>{children}</ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!Object.keys(context).length) {
    throw Error("not import toastContext provider");
  }
  return context;
};
