import { Postcard } from "@/types";
import { styled, Text, View } from "tamagui";
import { Tabs } from "tamagui";
import { colors } from "@/colors";
import { useState } from "react";
import Description from "./Description";

const ipsum: string = `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`;

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
        <Description card={card} ipsum={ipsum} />
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
