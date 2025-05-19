from fastapi import FastAPI, UploadFile, File, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from .parsing import extract_events_from_pdf, generate_ics

app = FastAPI(title="Syllabus → Calendar API")

# allow calls from your React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/parse-syllabus", summary="Upload a PDF syllabus and get back an .ics")
async def parse_syllabus(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=415, detail="Only PDF uploads supported")
    pdf_bytes = await file.read()

    events = extract_events_from_pdf(pdf_bytes)
    if not events:
        raise HTTPException(status_code=400, detail="No exam dates found in syllabus")

    ics_blob = generate_ics(events)
    return Response(content=ics_blob, media_type="text/calendar")

@app.get("/health", summary="Health check")
def health():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("src.backend:app", host="127.0.0.1", port=8000, reload=True)
