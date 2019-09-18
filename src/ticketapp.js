import eventlist from './eventlist'
import EventItem from './eventitem'

class TicketApp {
    // constructor() {
    //     this.eventlist = _eventlist__WEBPACK_IMPORTED_MODULE_0__.default;
    //     this.createLocationFilter();
    //     this.events = this.createEventList();
    // };

    createEventList() {
        let list = document.getElementById('list');
        let events = this.eventlist.Items.map(item => {
            let event = new EventItem(item.Day, item.Date, item.Time, item.EventName, item.VenueName, item.VenueCity, item.MinPrice, item.IsSellingFast, item.IsSoldOut);
            list.appendChild(event.listing);
            return event;
        });
        return events
    };
    
    // part 2
    createLocationFilter() {    
        let locationFilter = document.getElementById('location-filter');
        locationFilter.addEventListener('change', e => this.filterLocation(e.target.value));
        for (let item of this.eventlist.Items) {
            let loc = document.createElement('option');
            loc.value = item.VenueCity;
            loc.innerHTML = item.VenueCity;
            locationFilter.appendChild(loc);
        }
    }

    filterLocation(location) {
        if (location) {
            this.events.forEach(event => {
                if (event.city !== location) {
                    event.listing.setAttribute('display', 'none');
                };
            });
        }
    };

    startApp() {
        this.eventlist = _eventlist__WEBPACK_IMPORTED_MODULE_0__.default;
        this.events = this.createEventList();
        this.createLocationFilter();
    }

};

var application = new TicketApp();
document.addEventListener('DOMContentLoaded', application.startApp());

