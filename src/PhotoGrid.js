import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Fade from '@material-ui/core/Fade';
import { extractAuthor, extractDescription } from './utils';
import InfiniteScroll from 'react-infinite-scroller';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    margin: '5%',
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

function TitlebarGridList(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
    <InfiniteScroll
      pageStart={0}
      loadMore={props.loadPhotos}
      hasMore={true || false}
      threshold={1200}
      loader={<div className="loader" key={'z'}>Loading ...</div>}
    >
      <GridList cellHeight={300} className={classes.gridList} cols={4}>
        {props.photos.map((photo, index) => {
          const author = extractAuthor(photo.author);
          const description = extractDescription(photo.description, index);
          return (
          <Fade in={true} timeout={{enter: 3000}} key={index}>
            <GridListTile >
              <img src={photo.media.m} alt=""/>
              <GridListTileBar
                title={photo.title === ' ' || !photo.title ? <a href={photo.link}>Untitled</a> : <a href={photo.link}>{photo.title}</a>}
                subtitle={
                  <div><span>by: {<a href={`https://www.flickr.com/people/${photo.author_id}`}>{author}</a>}</span>
                  <br/><span>Tags: {photo.tags}</span></div>
                }
                actionIcon={description &&
                  <Tooltip
                    disableHoverListener={true}
                    placement="top"
                    id="tooltip-icon"
                    title={<div dangerouslySetInnerHTML={{ __html: description }}/>}
                  >
                    <IconButton size="large" className={classes.icon}>
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                }
              />
            </GridListTile>
          </Fade>
        )})}
      </GridList>
    </InfiniteScroll>
    </div>
  );
}

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitlebarGridList);
