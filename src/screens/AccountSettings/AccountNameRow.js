/* @flow */
import React, { PureComponent } from "react";
import { Trans } from "react-i18next";
import { StyleSheet } from "react-native";
import type { NavigationScreenProp } from "react-navigation";
import type { Account } from "@ledgerhq/live-common/lib/types";
import SettingsRow from "../../components/SettingsRow";
import LText from "../../components/LText";
import colors from "../../colors";

type Props = {
  navigation: NavigationScreenProp<*>,
  account: Account,
};

class AccountNameRow extends PureComponent<Props> {
  render() {
    const { navigation, account } = this.props;

    return (
      <SettingsRow
        event="AccountNameRow"
        title={<Trans i18nKey="account.settings.accountName.title" />}
        desc={<Trans i18nKey="account.settings.accountName.desc" />}
        arrowRight
        alignedTop
        onPress={() =>
          navigation.navigate("EditAccountName", {
            accountId: account.id,
          })
        }
      >
        <LText semiBold numberOfLines={1} style={styles.accountName}>
          {account.name}
        </LText>
      </SettingsRow>
    );
  }
}

export default AccountNameRow;

const styles = StyleSheet.create({
  accountName: {
    flexShrink: 1,
    textAlign: "right",
    color: colors.grey,
  },
});
