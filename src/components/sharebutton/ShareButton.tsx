import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton,FacebookIcon, LinkedinIcon, TwitterIcon, WhatsappIcon } from 'react-share';

interface Props {
  url: string;
}

export default function ShareButton(props: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleShareClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleShareClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Compartilhar">
        <IconButton aria-label="share" onClick={handleShareClick}>
          <ShareIcon />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleShareClose}>
        <MenuItem onClick={handleShareClose}>
          <FacebookShareButton url={props.url}>
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
        </MenuItem>
        <MenuItem onClick={handleShareClose}>
          <LinkedinShareButton url={props.url}>
            <LinkedinIcon size={32} round={true} />
          </LinkedinShareButton>
        </MenuItem>
        <MenuItem onClick={handleShareClose}>
          <TwitterShareButton url={props.url}>
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
        </MenuItem>
        <MenuItem onClick={handleShareClose}>
          <WhatsappShareButton url={props.url}>
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
        </MenuItem>
      </Menu>
    </>
  );
}
