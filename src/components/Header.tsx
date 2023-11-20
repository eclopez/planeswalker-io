import { Flex, Heading } from "@radix-ui/themes";
import styles from "@/styles/Header.module.css";

function Header() {
  return (
    <Flex px="1" className={styles.header}>
      <Heading size="6">
        <a href="/">Planeswalker.io</a>
      </Heading>
    </Flex>
  );
}

export default Header;
