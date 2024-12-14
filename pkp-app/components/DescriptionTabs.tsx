import { Postcard } from "@/types";
import { styled, Text } from "tamagui";
import { Tabs } from "tamagui";
import { colors } from "@/colors";
import { useState } from "react";
import Description from "./Description";

const CardDescription = ({ card }: { card: Postcard }) => {
  const [tab, setTab] = useState("en");
  return (
    <Tabs
      defaultValue="en"
      orientation="horizontal"
      flexDirection="column"
      alignItems="center"
      width="100%"
      height="100%"
      value={tab}
      onValueChange={setTab}
      gap="$2"
    >
      <Tabs.List>
        <StyledTab value="en" active={tab === "en"}>
          <Text
            fontFamily="Fair-Prosper"
            textDecorationLine={tab === "en" ? "underline" : "none"}
          >
            English
          </Text>
        </StyledTab>
        <StyledTab value="fi" active={tab === "fi"}>
          <Text
            fontFamily="Fair-Prosper"
            textDecorationLine={tab === "fi" ? "underline" : "none"}
          >
            Suomi
          </Text>
        </StyledTab>
      </Tabs.List>

      <Tabs.Content value="en">
        <Description card={card} lang="en" />
      </Tabs.Content>
      <Tabs.Content value="fi">
        <Description card={card} lang="fi" />
      </Tabs.Content>
    </Tabs>
  );
};

const StyledTab = styled(Tabs.Tab, {
  borderWidth: "$0",
  borderBottomWidth: "$0.25",
  variants: {
    active: {
      true: {
        backgroundColor: colors.yellow,
      },
      false: {
        backgroundColor: colors.amber,
      },
    },
  },
});

export default CardDescription;
