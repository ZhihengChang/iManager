$(function() { 

    var calendar = $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'agendaWeek,agendaDay'
      },
      defaultView: 'agendaWeek',
      defaultTimedEventDuration: '01:00',
      allDaySlot: false,
      scrollTime: '08:00',
      businessHours: {
        start: '8:00',
        end: '20:00',
      },
      lang: /^en-/.test(navigator.language) ? 'en' : 'en',
      eventOverlap: function(stillEvent, movingEvent) {
        return true;
      },
      editable: true,
      selectable: true,
      selectHelper: true,
      select: function(start, end) {
        var duration = (end - start) /1000;
        if(duration == 1800) {
          // set default duration to 1 hr.
            end = start.add(30, 'mins');
          return calendar.fullCalendar('select', start, end);
        }
        var title = prompt('Event Title:');
        var eventData;
        if (title && title.trim()) {
          eventData = {
            title: title,
            start: start,
            end: end
          };
          calendar.fullCalendar('renderEvent', eventData);
        }
        calendar.fullCalendar('unselect');
      },
      eventRender: function(event, element) {
        var start = moment(event.start).fromNow();
        element.attr('title', start);
      },
      loading: function() {
        
      }
    });
  
  });