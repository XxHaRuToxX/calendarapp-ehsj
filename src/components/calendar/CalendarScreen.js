import React, { useEffect, useState } from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';

import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment);

/* const events=[{
    title:'Cumpleaños de Nadie',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgColor:'#fafafa',
    notes:'Comprar el pastel',
    user:{
        _id:'123',
        name:'Haruto',
    }
}] */

export const CalendarScreen = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView'));
    const dispatch = useDispatch();
    const {uid} = useSelector(state => state.auth)
    const {events, activeEvent} = useSelector(state => state.calendar);

    /* console.log(events) */

    useEffect(() => {
        dispatch(eventStartLoading())
    }, [dispatch])

    const onDoubleClick=(e)=>{
        /* console.log(e) */
        dispatch(uiOpenModal());
    }
    const onSelectEvent=(e)=>{
        /* console.log(e) */
        dispatch(eventSetActive(e))
    }

    const onViewChange=(e)=>{
        setLastView(e);
        localStorage.setItem('lastView', e)
    }

    const onSelectSlot=(e)=>{
        /* console.log(e) */
        dispatch(eventClearActiveEvent())
    }

    const eventStyleGetter=(event, start, end, isSelected)=>{
        /* console.log(event, start, end, isSelected) */
        /* console.log(event) */
        const style={
            backgroundColor:(uid === event.user._id) ? '#367cf7' : '#465660',
            borderRadius:'0px',
            opacity:0.8,
            display:'flex',
            color:'white'
        }

        return{
            style
        }
    }

    return (
        <div className="calendar-screen">
            <Navbar/>

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                onSelectSlot={onSelectSlot}
                selectable={true}
                view={lastView || 'month'}
                components={{
                    event:CalendarEvent
                }}
            />
            <AddNewFab/>
            {
                (activeEvent) && (
                    <DeleteEventFab/>
                )
            }
            <CalendarModal/>
        </div>
    )
}
