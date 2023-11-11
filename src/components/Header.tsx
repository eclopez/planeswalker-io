import { Flex, Heading } from "@radix-ui/themes";
import styles from "@/styles/Header.module.css";

function Header() {
  return (
    <Flex px="1" className={styles.header}>
      <Heading size="6">Planeswalker.io</Heading>
    </Flex>
  );
}

export default Header;
