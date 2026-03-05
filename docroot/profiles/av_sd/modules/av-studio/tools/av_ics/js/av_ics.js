class AvIcs extends HTMLElement {
  constructor() {
    super();
    this._start = null;
    this._end = null;
    this._description = null;
    this._summary = null;
    this._allday = false;
    this._filename = 'event.ics';
    this._title = null;
  }

  connectedCallback() {
    this._start = this.getAttribute('start');
    this._end = this.getAttribute('end');
    this._description = this.getAttribute('description');
    this._summary = this.getAttribute('summary');
    this._allday = this.hasAttribute('allday');
    this._filename = this.getAttribute('filename') || 'event.ics';
    this._title = this.getAttribute('title') || '';

    this.convertDatesToIcsFormat();

    const link = document.createElement('a');
    link.title = this._title;
    link.addEventListener('click', (event) => {
        event.preventDefault();
        this.downloadIcs();
    });
    link.innerHTML = this.innerHTML;
    this.innerHTML = '';
    this.appendChild(link);
  }

  convertDatesToIcsFormat() {
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/;
    const ymdRegex = /^\d{4}-\d{2}-\d{2}$/;
    const ymdhmRegex = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/;

    if (iso8601Regex.test(this._start)) {
      this._start = this.formatDateForIcs(new Date(this._start));
    } else if (ymdRegex.test(this._start)) {
      this._start = this.formatDateForIcs(new Date(this._start + 'T00:00'));
    } else if (ymdhmRegex.test(this._start)) {
      this._start = this.formatDateForIcs(new Date(this._start));
    } else {
      console.error('Invalid start date format. Please use either ISO 8601 format (YYYY-MM-DDTHH:MM:SS), "YYYY-MM-DD" or "YYYY-MM-DD HH:mm" format');
      return;
    }

    if (this._end) {
      if (iso8601Regex.test(this._end)) {
        this._end = this.formatDateForIcs(new Date(this._end));
      } else if (ymdRegex.test(this._end)) {
        this._end = this.formatDateForIcs(new Date(this._end + 'T00:00'));
      } else if (ymdhmRegex.test(this._end)) {
        this._end = this.formatDateForIcs(new Date(this._end));
      } else {
        console.error('Invalid end date format. Please use either ISO 8601 format (YYYY-MM-DDTHH:MM:SS), "YYYY-MM-DD" or "YYYY-MM-DD HH:mm" format');
        return;
      }
    } else if (this._allday) {
      const nextDay = new Date(new Date(this._start).getTime() + 24 * 60 * 60 * 1000);
      this._end = this.formatDateForIcs(nextDay);
    } else {
      this._end = this._start;
    }
  }

  formatDateForIcs(date) {
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}${month}${day}T${hours}${minutes}00`;
  }

  downloadIcs() {
    const dtstamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
    const uid = Math.random().toString(36).substr(2, 10); // Generate a random UID

    let content = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//AV-Studio//DE\r\nBEGIN:VEVENT\r\nDTSTAMP:${dtstamp}\r\nUID:${uid}\r\nDTSTART${this._allday ? ';VALUE=DATE' : ';TZID=Europe/Berlin'}:${this._start}`;
    if (this._end) {
      content += `${this._allday ? `\r\nDTEND;VALUE=DATE:${this._end}` : `\r\nDTEND;TZID=Europe/Berlin:${this._end}`}`;
    }
    if (this._summary) {
      content += `\r\nSUMMARY:${this._summary}`;
    }
    if (this._description) {
      content += `\r\nDESCRIPTION:${this._description}`;
    }
    content += `\r\nEND:VEVENT\r\nEND:VCALENDAR`;

    const blob = new Blob([content], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = this._filename.toLowerCase().replace(/\s+/g, '_') + '.ics';
    link.click();
    URL.revokeObjectURL(url);
  }

  get start() {
    return this._start;
  }

  set start(value) {
    this._start = value;
    this.setAttribute('start', value);
  }

  get end() {
    return this._end;
  }

  set end(value) {
    this._end = value;
    this.setAttribute('end', value);
  }

  get description() {
    return this._description;
  }

  set description(value) {
    this._description = value;
    this.setAttribute('description', value);
  }

  get summary() {
    return this._summary;
  }

  set summary(value) {
    this._summary = value;
    this.setAttribute('summary', value);
  }

  get allday() {
    return this._allday;
  }

  set allday(value) {
    this._allday = value;
    if (value) {
      this.setAttribute('allday', '');
    } else {
      this.removeAttribute('allday');
    }
  }

  get filename() {
    return this._filename;
  }

  set filename(value) {
    this._filename = value;
    this.setAttribute('filename', value);
  }

  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
    this.setAttribute('title', value);
  }
}

customElements.define('av-ics', AvIcs);
