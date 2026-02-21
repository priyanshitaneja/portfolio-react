import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

import "./index.css";

const antIcon = <LoadingOutlined style={{ fontSize: 52 }} spin />;

const SpinnerLoader = () => {
    return <Spin className="spinner_loader" size="large" indicator={antIcon} />;
}

export default SpinnerLoader;