import React, { PropTypes } from 'react';

function Layout(props) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=devide-width, initial-scale=1.0, minimum-scale=1.0" />
        <title>{props.title}</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css" />
        <link rel="stylesheet" href="http://localhost:3001/styles.css" />
      </head>
      <body>
        <div
          id="render-target"
          dangerouslySetInnerHTML={{
            __html: props.content,
          }}
        />

        <script src="http://localhost:3001/app.js" />
      </body>
    </html>
  );
}

Layout.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

export default Layout;
