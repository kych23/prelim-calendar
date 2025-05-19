import io
import re
from datetime import timedelta
from pdfminer.high_level import extract_text
import dateparser
from icalendar import Calendar, Event

def extract_events_from_pdf(pdf_bytes: bytes):
    """
    Return a list of {"title": str, "dt": datetime} for each exam found.
    """
    text = extract_text(io.BytesIO(pdf_bytes))

    # Simple heuristic: look for "Midterm" or "Final" + "on <Month> <day>, <year>"
    pattern = re.compile(
        r'(?P<label>Midterm|Final)[\w\s,:-]{0,50}?on\s+(?P<date>\w+\s+\d{1,2},\s*\d{4})',
        re.IGNORECASE
    )

    events = []
    for m in pattern.finditer(text):
        label = m.group('label').title()
        raw_date = m.group('date')
        dt = dateparser.parse(raw_date)
        if dt:
            events.append({"title": label, "dt": dt})
    return events

def generate_ics(events, duration_hours=1):
    """
    Given a list of {"title","dt"}, produce an ICS bytes blob.
    """
    cal = Calendar()
    cal.add('prodid', '-//Prelim Calendar//EN')
    cal.add('version', '2.0')

    for e in events:
        ev = Event()
        ev.add('summary', e['title'])
        ev.add('dtstart', e['dt'])
        ev.add('dtend', e['dt'] + timedelta(hours=duration_hours))
        cal.add_component(ev)

    return cal.to_ical()
