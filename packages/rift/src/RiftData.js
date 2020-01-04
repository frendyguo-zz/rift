import React, { Component } from 'react';
import serialize from 'serialize-javascript';

export default ({ data }) => (
  <script
    id="__RIFT_DATA__"
    type="application/json"
    dangerouslySetInnerHTML={{
      __html: serialize({ ...data }),
    }}
  />
);
