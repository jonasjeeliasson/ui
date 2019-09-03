import React, { useRef, useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import { Typography, Portal } from '../..';

storiesOf('Atoms | Portal', module)
  .add('Default', () => (
    <Portal>
      <Typography type="primary" as="p">
        This element is moved to the bottom of the body tag
      </Typography>
    </Portal>
  ))
  .add('Portal to specified destination', () => {
    const ControlledExample = () => {
      const destination = useRef(null);
      const [renderPortal, setShouldRenderPortal] = useState(false);

      useEffect(() => {
        if (destination && destination.current) {
          setShouldRenderPortal(true);
        }
      }, [destination]);

      return (
        <>
          <div id="destination" ref={destination} />
          {renderPortal && (
            <div id="origin">
              <Portal attachTo={destination.current}>
                <Typography type="primary" as="p">
                  This element is moved to a specified HTMLElement
                </Typography>
              </Portal>
            </div>
          )}
        </>
      );
    };
    return <ControlledExample />;
  })
  .add('If attachTo prop is not a HTMLElement then nothing is rendered', () => {
    const ControlledExample = () => {
      const destination = useRef(null);

      return (
        <div id="origin">
          <Portal attachTo={destination.current}>
            <Typography type="primary" as="p">
              This element should not be rendered
            </Typography>
          </Portal>
        </div>
      );
    };
    return <ControlledExample />;
  });
