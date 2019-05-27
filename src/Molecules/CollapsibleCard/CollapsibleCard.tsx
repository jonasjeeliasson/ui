import React, { useState, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { Card, Typography, Icon, Flexbox } from '../..';
import { IndicatorsProps, CollapsibleProps } from './Collapsible.types';

const StyledCollapsible = styled.div<{
  height: string | null;
  disabledTransition: boolean;
}>`
  overflow: hidden;
  will-change: height;
  height: ${p => (p.height ? p.height : 'auto')};
  transition: ${p => (p.disabledTransition ? '' : 'height 0.16s ease-out')};

  &[hidden] {
    display: none;
  }
`;

const StyledButton = styled.button<IndicatorsProps>`
  position: relative;
  background: none;
  cursor: pointer;
  display: block;
  width: 100%;
  padding: ${p => p.theme.spacing.unit(5)}px ${p => p.theme.spacing.unit(5)}px;
  border: 0;

  &::before {
    content: '';
    display: block;
    background: ${p => p.theme.color.cta};
    width: 2px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition: opacity 0.16s ease-out;
    opacity: ${p => {
      if (p.collapsed) {
        return `1`;
      }

      return `0`;
    }};
  }
`;

const AnimatedChevronUp = styled(Icon.ChevronUp)<IndicatorsProps>`
  transform: ${p => (p.collapsed ? 'rotate(180deg)' : 'rodate(0)')};
  transform-origin: center center;
  transition: transform 0.16s ease-out;
`;

export const CollapsibleCard: React.FC<CollapsibleProps> = ({
  title,
  children,
  collapsedInitial: collapsedInitial = false,
}) => {
  const [collapsed, setCollapsed] = useState(collapsedInitial);
  const [collapsing, setCollapsing] = useState(false);
  const [expanding, setExpanding] = useState(false);
  const [disabledTransition, setDisabledTransition] = useState(false);
  const [height, setHeight] = useState(collapsed ? '0px' : null);
  const collapsibleRef = useRef(null);

  useLayoutEffect(() => {
    if (!collapsing && !expanding) {
      return () => null;
    }

    let outerRequest: number;
    let innerRequest: number;

    // get the height of the element's inner content, regardless of its actual size
    // @ts-ignore
    const collapsibleHeight = collapsibleRef.current.scrollHeight;

    if (collapsing) {
      // temporarily disable all css transitions
      setDisabledTransition(true);

      // on the next frame (as soon as the previous style change has taken effect),
      // explicitly set the element's height to its current pixel height, so we
      // aren't transitioning out of 'auto'
      outerRequest = requestAnimationFrame(() => {
        setHeight(`${collapsibleHeight}px`);
        setDisabledTransition(false);

        // on the next frame (as soon as the previous style change has taken effect),
        // have the element transition to height: 0
        innerRequest = requestAnimationFrame(() => {
          setHeight(`0px`);
        });
      });
    }

    if (expanding) {
      // have the element transition to the height of its inner content
      setHeight(`${collapsibleHeight}px`);
    }

    return function cleanup() {
      if (outerRequest) {
        cancelAnimationFrame(outerRequest);
      }

      if (innerRequest) {
        cancelAnimationFrame(innerRequest);
      }
    };
  }, [collapsing, expanding]);

  const onTransitionEnd = () => {
    if (collapsing || expanding) {
      // this check bcz ios11 triggers onTransitionEnd on early exit of useLayoutEffect()

      if (expanding) {
        // remove "height" from the element's inline styles, so it can return to its initial value
        setHeight(null);

        setExpanding(false);
      }

      if (collapsing) {
        setCollapsing(false);
      }

      setCollapsed(!collapsed);
    }
  };

  const toggle = () => {
    if (collapsed) {
      setExpanding(true);
    } else {
      setCollapsing(true);
    }
  };

  return (
    <Card>
      <StyledButton type="button" onClick={toggle} collapsed={collapsed} aria-expanded={!collapsed}>
        <Flexbox container gutter={4} alignItems="center" justifyContent="space-between">
          <Flexbox item>
            <Typography type="title3" as="h2">
              {title}
            </Typography>
          </Flexbox>
          <Flexbox item>
            <AnimatedChevronUp size={2} collapsed={collapsed} />
          </Flexbox>
        </Flexbox>
      </StyledButton>
      <StyledCollapsible
        ref={collapsibleRef}
        height={height}
        disabledTransition={disabledTransition}
        onTransitionEnd={onTransitionEnd}
        hidden={collapsed && !expanding}
      >
        {children}
      </StyledCollapsible>
    </Card>
  );
};
