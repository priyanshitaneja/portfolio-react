'use client';

import type { ReactNode } from 'react';
import { GithubOutlined, LinkOutlined } from '@ant-design/icons';
import { Card } from 'antd';

import './index.scss';

const { Meta } = Card;

/*
 * 'use client' is here only because antd's Card and its action handlers need
 * it. Once antd is replaced with a native <article> and the actions become
 * real anchors, this becomes a server component again and /projects ships zero
 * page JavaScript.
 */

type ProjectCardProps = {
  name?: string;
  description?: ReactNode;
  imageUrl?: string;
  githubUrl?: string;
  deployedUrl?: string;
};

const ProjectCard = ({
  name,
  description,
  imageUrl,
  githubUrl,
  deployedUrl,
}: ProjectCardProps) => (
  <Card
    className="project_card"
    style={{
      width: 320,
    }}
    hoverable
    cover={
      <img
        alt={name ? name : 'Image Alt'}
        height={185}
        src={
          imageUrl
            ? imageUrl
            : 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
        }
      />
    }
    actions={[
      <LinkOutlined
        key="deployed"
        onClick={() => deployedUrl && window.open(deployedUrl, '_blank')}
      />,
      <GithubOutlined
        key="github"
        onClick={() => githubUrl && window.open(githubUrl, '_blank')}
      />,
    ]}
  >
    <Meta
      title={name ? name : 'Project Name'}
      description={description ? description : 'Project Description'}
    />
  </Card>
);

export default ProjectCard;
