import {
  Banner,
  Button,
  Container,
  Divider,
  Inline,
  IconMegaphone32,
  render,
  Stack,
  Text,
  VerticalSpace,
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";

import { h } from 'preact'
import { useCallback, useState } from "preact/hooks";

import { CreatePageHandler } from "./types";

function Plugin() {
  const handlePageButtonClick = useCallback(function () {
    emit<CreatePageHandler>("CREATE_PAGES");
  }, []);

  return (
    <Container style="padding: 0">
      <Banner icon={<IconMegaphone32 />}>
      Welcome to Mistica Project Starter Plugin
    </Banner>
      <Container>
        <VerticalSpace space="large" />
        <Text bold>Automations</Text>
        <VerticalSpace space="medium" />
        <Button fullWidth onClick={handlePageButtonClick}>
          Setup design document
        </Button>
        <VerticalSpace space="large" />
      </Container>
      <Divider />
      <Container>
        <VerticalSpace space="large" />
        <Stack space="extraLarge">
          <Stack space="medium">
            <Text bold>All you need to start designing is here</Text>
            <Inline space="medium">
              <Text>
                <a href="https://www.figma.com/file/t4zLZLdqFLHOCf1DIaxS8e/M%C3%ADstica%2C-Figma-%26-You?t=SJI1vwkbBHFFJo3j-6" target="_blank">
                  🌐 Mística, Figma & You
                </a>
              </Text>
              <Text>
                <a
                  href="https://brandfactory.telefonica.com/mistica"
                  target="_blank"
                >
                  🌐 Mistica DS Documentation
                </a>
              </Text>
            </Inline>
          </Stack>
          <Stack space="medium">
            <Text bold>Find us here</Text>
            <Inline space="medium">
              <Text>
                <a
                  href="https://teams.microsoft.com/l/channel/19%3ad2e3607a32ec411b8bf492f43cd0fe0c%40thread.tacv2/General?groupId=e265fe99-929f-45d1-8154-699649674a40&tenantId=9744600e-3e04-492e-baa1-25ec245c6f10"
                  target="_blank"
                >
                  🌐 Teams channel
                </a>
              </Text>
              <Text>
                <a
                  href="https://mistica.substack.com/"
                  target="_blank"
                >
                  🌐 Our Newsletter
                </a>
              </Text>
            </Inline>
          </Stack>{" "}
        </Stack>
      </Container>
    </Container>
  );
}

export default render(Plugin);
