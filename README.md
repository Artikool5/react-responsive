# react-responsive

React hook and component for easy access to MediaQueryList functionality.

> [!CAUTION]
> For learning purposes only!

`useMediaQuery(queryObject)` returns

- `matches: boolean` - whether browser media matches passed media query.

`queryObject` - an object containing a field "query" that is a valid media query.

## Usage examples

### useMediaQuery

```tsx
function App() {
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1200px)" });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1800px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1200px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  return (
    <div>
      <h1>Device test</h1>
      {isDesktopOrLaptop && <p>This is a desktop or a laptop</p>}
      {isBigScreen && <p>Also, you have a huge screen!</p>}
      {isTabletOrMobile && <p>You are using tablet or a phone</p>}
      <p>
        This devise is in {isPortrait ? "portrait" : "landscape"} orientation
      </p>
      {isRetina && <p>This devise has a retina display</p>}
    </div>
  );
}
```

### MediaQuery component

```tsx
function App() {
  return (
    <>
      <TestMediaQuery />
      <div>
        <h1>Device Test!</h1>
        <MediaQuery minWidth={1200}>
          <p>This is a desktop or a laptop</p>
          <MediaQuery minWidth={1800}>
            <p>Also, you have a huge screen!</p>
          </MediaQuery>
        </MediaQuery>
        <MediaQuery maxWidth={1200}>
          <p>You are using tablet or a phone</p>
        </MediaQuery>
        <MediaQuery orientation="portrait">
          <p>This devise is in portrait orientation</p>
        </MediaQuery>
        <MediaQuery orientation="landscape">
          <p>This devise is in landscape orientation</p>
        </MediaQuery>
        <MediaQuery minResolution="2dppx">
          {(matches) =>
            matches ? <p>You are retina</p> : <p>You are not retina</p>
          }
        </MediaQuery>
      </div>
    </>
  );
}
```
