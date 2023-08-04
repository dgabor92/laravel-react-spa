import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC<{}> = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Page not Found"
      extra={
        <Button type="default" color="black" onClick={() => navigate("/")}>
          Back Home
        </Button>
      }
    ></Result>
  );
};

export default NotFoundPage;
