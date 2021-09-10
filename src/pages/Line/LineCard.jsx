import React from 'react';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const Spacer = require('react-spacer')

const getPaperStyle = () => ({
  padding: '6px 16px',
})

const getConnectorStyle = (color) => ({
  backgroundColor: color,
  width: "5px"
})

const getOppositeContentStyle = (isAlternate) => {
  const baseStyle = {}
  return isAlternate ? baseStyle : {...baseStyle, flex: 0.1 }
}

const CardConnector = props => {
  const { color, isFirst, isLast } = props
  const lineColor = isFirst || isLast ? "#ffffff00" : color
  const connectorStyle = getConnectorStyle(lineColor)
  return (<TimelineConnector style={connectorStyle}/>)
}

const LineCard = props => {
  const { memoryId, isFirst, isLast, alternate, color, date, mediaUrl, title, description } = props

  const oppContentStyle = getOppositeContentStyle(alternate)

  return (
    <TimelineItem >
      <TimelineOppositeContent style={oppContentStyle}>
        <div style={{height: "100%", verticalAlign: "middle"}}>
          <Spacer height="40%" />
          <strong>{date}</strong>
        </div>
      </TimelineOppositeContent>
      <TimelineSeparator color={color}>
        <CardConnector color={color} isFirst={isFirst}/>
        <TimelineDot color="inherit">
          <FiberManualRecordIcon style={{ color: color }}/>
        </ TimelineDot>
        <CardConnector color={color} isLast={isLast}/>
      </TimelineSeparator>
      <Link
      style={{ textDecoration: 'none' }}
      to={{
        pathname: "/memory/" + memoryId,
        state: props
      }}
      >
        <TimelineContent>
          <Paper elevation={3} style={getPaperStyle()}>
            <img alt={title} src={mediaUrl} style={{width: "100%"}}/>
            <Typography variant="h6" component="h1">
              <strong>{title}</strong>
            </Typography>
            <Typography variant="body1">{description}</Typography>
          </Paper>
        </TimelineContent>
      </Link>
    </TimelineItem>
  )
}

export default LineCard
