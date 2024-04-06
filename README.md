# ClicknClear Full Stack Engineer Coding Test
Included in this repo is a file `tracks.json`. Below is a sample of the contents of this file:

```
{
  "tracks": [
    {
      "artist": "12 Stone Toddler",
      "title": "Piranha",
      "id": 1
    },
    {
      "artist": "12 Stone Toddler",
      "title": "Runaway Train",
      "id": 2
    },
    ...,
    {
      "artist": "Beardthug",
      "title": "This Falafal Has Drugs In It",
      "id": 500
    }
  ]
}
```

For this test, you should write an application that serves a REST API allowing a client to query the contents of this file, as well as a basic web client to display the data.

The API should support the following endpoints:
- Given a track id return the associated track.
- Given an artist name return **all** associated tracks.

## Requirements
- Use TypeScript throughout for the API and the UI.
- Write the API using NodeJS, using a framework such as Fastify or Express.
- Write the UI in React, you may use a component library to assist you.
- Your code should be written in a professional manner, as if it was being submitted for a code review.

## What We're Assessing
- A good understanding of TypeScript.
- A good understanding and implementation of React.
- A good understanding and implementation of RESTful APIs.
- Code structure and readability.
- Reasonable user-experience.
- Use of version control.

## Submission
### Privately
If you would prefer this to not be public.
1) Go to GitHub and create a new private repo called ClicknClear-FullStack-Tech-Test.
2) Clone this repository via: `git clone https://github.com/ClicknClear/FullStack-Tech-Test.git`
3) In the root directory of the cloned repo, run `git remote set-url origin https://github.com/<your-username>/ClicknClear-FullStack-Tech-Test.git`
4) Carry out the test.
5) Once the test is complete, add [Jack](https://github.com/jackbinney) and [Tristan](https://github.com/TristanBarlow) as contributors to your private repository.

### Publicly
If you're happy for this test to be visible publicly.
1) Fork this repository.
2) Carry out the test.
3) Once the test is complete, email `jack@clicknclear.com` and `tristan@clicknclear.com` with a link to your public repository.

### Incomplete Submission
If you cannot complete this test, we accept incomplete submissions. To do this, please submit as normal as per the steps outlined above.
