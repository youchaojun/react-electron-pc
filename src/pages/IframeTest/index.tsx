import { RouterParamsIF } from '@/typings/router';
import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';

export default function IframeTest(): ReactElement {
  const params = useParams<RouterParamsIF>();
  console.log(params);

  return (
    <div>
      22
      <a href="" target="_brank">
        dd
      </a>
      <iframe width="100%" height="300px" src="http://localhost:3001/scrollTop/111"></iframe>
      <iframe width="100%" height="300px" src="http://localhost:3001/scrollTop/222"></iframe>
    </div>
  );
}
