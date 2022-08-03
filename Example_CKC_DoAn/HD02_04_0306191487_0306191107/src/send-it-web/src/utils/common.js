const stringToTime = (time) => {
  const date = new Date(time).toLocaleTimeString([], {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  return date;
};

const getTime = (time) => {
  const date = new Date(time).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  return date;
};

const getWeekDaysAndLocaleTime = (time) => {
  const today = new Date().toLocaleDateString();
  const thisDay = new Date(time).toLocaleDateString();
  if (today === thisDay) return 'Today';
  const date = new Date(time).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    weekday: 'short',
  });
  return date;
};

const compareDateVsToday = (dateString) => {
  const today = new Date().toLocaleDateString();
  const thisDay = new Date(dateString).toLocaleDateString();
  const thisDayTime = new Date(dateString).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  if (today === thisDay) {
    return thisDayTime;
  } else {
    return thisDay;
  }
};

const getConversationTimeShow = (dateString) => {
  const today = new Date();
  const thisDay = new Date(dateString);

  var Difference_In_Time = today.getTime() - thisDay.getTime();
  var thisDayTime = Math.floor(Difference_In_Time / (1000 * 3600 * 24));

  if (thisDayTime >= 7) {
    thisDayTime = new Date(dateString).toLocaleDateString();
  } else if (thisDayTime > 0) {
    thisDayTime = new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
    });
  } else {
    thisDayTime = new Date(dateString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  return thisDayTime;
};

module.exports = {
  getTime,
  stringToTime,
  compareDateVsToday,
  getWeekDaysAndLocaleTime,
  getConversationTimeShow,
};
