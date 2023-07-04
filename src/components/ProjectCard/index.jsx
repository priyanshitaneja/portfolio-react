import {
  GithubOutlined,
  LinkOutlined
} from "@ant-design/icons";
import { Card } from "antd";

import "./index.scss";

const { Meta } = Card;

const ProjectCard = ({ name, description, imageUrl, githubUrl, deployedUrl }) => (
  <Card
    className="project_card"
    style={{
      width: 320,
    }}
    hoverable
    cover={
      <img
        alt={name ? name : "Image Alt"}
        height={185}
        src={
          imageUrl
            ? imageUrl
            : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        }
      />
    }
    actions={[
      <LinkOutlined onClick={() => deployedUrl && window.open(deployedUrl, "_blank")} />,
      <GithubOutlined onClick={() => githubUrl && window.open(githubUrl, "_blank")} />
    ]}
  >
    <Meta
      title={name ? name : "Project Name"}
      description={description ? description : "Project Description"}
    />
  </Card>
);
export default ProjectCard;
