const trackChatSender = {
  saveLastSender: (lastActivity, messageCount) => {
    localStorage.setItem('lstchtact', lastActivity);
    localStorage.setItem('lstchtcnt', messageCount);
  },
  getLastSender: () => {
    const time = localStorage.getItem('lstchtact');
    const count = parseInt(localStorage.getItem('lstchtcnt'));
    return { time, count };
  },
};

module.exports = trackChatSender;
