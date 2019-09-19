class EventItem {
    constructor(day, date, time, event, venue, city, price, isSoldOut, dateVal) {
        this.day = day;
        this.date = date;
        this.time = time;
        this.event = event;
        this.venue = venue;
        this.city = city;
        this.price = price;
        this.isSoldOut = isSoldOut;
        this.dateVal = dateVal;

        this.listing = document.createElement('div');
        this.listing.classList.add('event-listing');

        this.leftInfo = document.createElement('div');
        this.leftInfo.classList.add('left-info');

        this.rightInfo = document.createElement('div');
        this.rightInfo.classList.add('right-info');

        this.listing.appendChild(this.leftInfo);
        this.listing.appendChild(this.rightInfo);

        this.updateTimeInfo();
        this.updateEventInfo();
    };

    convertToUSD() {
        this.price = Math.ceil(parseInt(this.price.slice(1)) * 1.25);
        return "$" + `${this.price}`;
    }

    updateTimeInfo() {
        let timeInfo = document.createElement('ul');
        timeInfo.classList.add('time-info');

        let day = document.createElement('li');
        day.classList.add('day');
        day.innerHTML = `${this.day}`;

        let date = document.createElement('li');
        date.classList.add('date');
        date.innerHTML = `${this.date}`;

        let time = document.createElement('li');
        time.classList.add('time');
        time.innerHTML = `${this.time}`;

        timeInfo.appendChild(day);
        timeInfo.appendChild(date);
        timeInfo.appendChild(time);
        this.leftInfo.appendChild(timeInfo)
    };

    updateEventInfo() {
        let eventInfo = document.createElement('ul');
        eventInfo.classList.add('event-info');

        let price = document.createElement('div');
        price.classList.add('price');
        price.innerHTML = `${this.convertToUSD()}`;

        if (this.isSellingFast) {
            price.classList.add('yellow');
        } else {
            price.classList.add('green');
        };

        let eventName = document.createElement('li');
        eventName.classList.add('event-name');
        eventName.innerHTML = `${this.event}`;

        let venueName = document.createElement('li');
        venueName.classList.add('venue-name');
        venueName.innerHTML = `${this.venue}`;

        let venueCity = document.createElement('li');
        venueCity.classList.add('venueCity');
        venueCity.innerHTML = `${this.city}`;

        eventInfo.appendChild(eventName);
        eventInfo.appendChild(venueName);
        eventInfo.appendChild(venueCity);
        this.rightInfo.appendChild(eventInfo);
        this.rightInfo.appendChild(price);
    };
};

export default EventItem