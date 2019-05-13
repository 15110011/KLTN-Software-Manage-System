import * as React from 'react'
import * as BigCalendar from 'react-big-calendar'

// dependency plugin for react-big-calendar
import * as moment from "moment";
import * as dateFns from 'date-fns'
import styles from './EventStyles'
import { withStyles, Grid } from '@material-ui/core';
import RegularCard from "../components/Card/RegularCard";
import CustomSnackbar from '../components/CustomSnackbar'
import '../../node_modules/react-big-calendar/lib/css/react-big-calendar.css'
import useFetchData from '../CustomHook/useFetchData'
import CreateEventDialog from './CreateEventDialog'
import { EVENTS_URL } from "../common/urls";
const localizer = BigCalendar.momentLocalizer(moment)


function Events(props) {
  const { classes, user } = props
  const [events, setEvents] = useFetchData(EVENTS_URL + '?view_type=both', props.history, { data: [], total: 0 })
  const [createEvent, setCreateEvent] = React.useState({})
  const [successNoti, setSuccessNoti] = React.useState(false)
  const [eventClickedData, setEventClickedData] = React.useState({})
  const eventColors = (event, start, end, isSelected) => {
    var backgroundColor = "event-";
    event.color
      ? (backgroundColor = backgroundColor + event.color)
      : (backgroundColor = backgroundColor + "default");
    return {
      className: backgroundColor
    };
  }
  const notification = (m = 'Successfully Added') => {
    setSuccessNoti(m)
    setTimeout(() => {
      setSuccessNoti(false)
    }, 2000);
  }

  return (
    <div style={{ justifyContent: 'center', display: 'flex' }}>
      {successNoti && <CustomSnackbar isSuccess msg={successNoti} />}

      {
        Object.keys(eventClickedData).length > 0 && <CreateEventDialog eventData={eventClickedData}
          toggleDialog={() => { setEventClickedData({}) }}
          user={user}
          preDefStartDate={eventClickedData.start}
          preDefEndDate={eventClickedData.end}
          notification={notification}

        />
      }
      {
        Object.keys(createEvent).length > 0 && <CreateEventDialog
          toggleDialog={() => { setCreateEvent({}) }}
          user={user}
          preDefStartDate={createEvent.slots[0]}
          notification={notification}
          updateActivities={(newEvent) => {
            const cloneEvents = [...events.data]
            const e = newEvent
            cloneEvents.unshift(e)
            setEvents({ data: cloneEvents })
            setCreateEvent({})
          }}
          preDefEndDate={createEvent.slots[createEvent.slots.length - 1]}
        />
      }
      <Grid container style={{
        maxWidth: '83.333333%',
        flexBasis: '83.333333%'
      }}>
        <Grid item xs={12}>
          <RegularCard
            content={
              <BigCalendar
                selectable
                events={events.data.map((e, i) => {
                  let color = 'green'
                  if (e.priority == 1) {
                    color = 'yellow'
                  }
                  else if (e.priority == 2) {
                    color = 'red'
                  }
                  return {
                    id: e.id,
                    title: e.name,
                    start: new Date(e.start_date),
                    end: new Date(e.end_date),
                    assigned_to: user,
                    order: e.order ? e.order.id : '',
                    marketing: e.marketing ? e.marketing.marketing_plan.id : '',
                    content: e.content,
                    contacts: e.contacts.map(t => ({
                      label: t.first_name + ' ' + t.last_name, value: t.id, ...t
                    })),
                    priority: e.priority,
                    mustBeCampaign: (e.marketing || e.order) ? true : false,
                    type_: e.marketing ? 'campaign' : 'personal',
                    campaign: e.marketing ? e.marketing.campaign : null,
                    color
                  }
                })}
                defaultView="month"
                localizer={localizer}
                onSelectEvent={event => {
                  setEventClickedData(event)
                }}
                onSelectSlot={setCreateEvent}
                eventPropGetter={eventColors}
              />
            }
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(Events);