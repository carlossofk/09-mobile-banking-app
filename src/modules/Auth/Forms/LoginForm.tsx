import { LinearGradient } from "expo-linear-gradient";
import { View, TextInput, Image, Text, StyleSheet, Button } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useRouter } from "expo-router";

import { validatorLoginForm } from "./validators/loginForm";
import { useAuth } from "../hooks/useAuth";
import { saveToken } from "@/src/core/utils/storage";

export const LoginForm = () => {
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(validatorLoginForm),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const { login, error, loading } = useAuth();

  const onSubmit = async (data: any) => {
    const response = await login({
      email: data.email,
      password: data.password,
    });

    console.log(JSON.stringify(response, null, 2));
    if (!error) {
      saveToken(response.dinBody.token);
      router.replace("/(tabs)/explore");
    }
  };

  return (
    <LinearGradient
      colors={["#2754C8", "#110F72"]}
      start={{ x: 0, y: 0.2 }}
      end={{ x: 1, y: 0.8 }}
      style={[styles.container]}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../../../../assets/images/logo-transfer.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Transfer</Text>
      </View>

      <View style={styles.fieldsContainer}>
        <Text style={styles.label}>User</Text>
        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
              {error?.message && (
                <Text style={styles.labelError}>{error?.message}</Text>
              )}
            </View>
          )}
          name="email"
          rules={{ required: true }}
        />

        <Text style={styles.label}>Password</Text>
        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
              {error?.message && (
                <Text style={styles.labelError}>{error?.message}</Text>
              )}
            </View>
          )}
          name="password"
          rules={{ required: true }}
        />

        <View style={styles.button}>
          <Button title="Login" onPress={handleSubmit(onSubmit)} />
        </View>
        <View style={{ marginBlock: 20 }}>
          <Text style={styles.register}>
            New User?
            <Link href={"/register"} style={styles.link}>
              {" "}
              Register here
            </Link>
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 56,
    height: 56,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    paddingBlock: 10,
  },
  fieldsContainer: {
    width: "100%",
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
  inputWrapper: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingInline: 12,
    marginBottom: 10,
  },

  label: {
    color: "black",
    fontWeight: 500,
    marginBottom: 0,
    marginLeft: 12,
  },

  labelError: {
    color: "red",
    fontWeight: 500,
  },

  input: {
    height: 40,
    width: 350,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },

  button: {
    paddingInline: 12,
    marginTop: 20,
    backgroundColor: "transparent",
    borderRadius: 8,
    cursor: "pointer",
  },

  register: {
    textAlign: "center",
  },
  link: {
    color: "#2754C8",
    textDecorationLine: "underline",
  },
});
