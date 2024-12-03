import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { validatorRegisterForm } from "./validators/registerForm";
import { useAuth } from "../hooks/useAuth";

export const RegisterForm = () => {
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(validatorRegisterForm),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const { register, error, loading } = useAuth();

  const onSubmit = async (data: any) => {
    const response = await register({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    });

    console.log(JSON.stringify(response, null, 2));
    if (!error) {
      router.replace("/");
    }
  };

  return (
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
        name="firstName"
        rules={{ required: true }}
      />

      <Text style={styles.label}>Last Name</Text>
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
        name="lastName"
        rules={{ required: true }}
      />

      <Text style={styles.label}>Email</Text>
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
        <Button title="Register" onPress={handleSubmit(onSubmit)} />
      </View>
      <View style={{ marginBlock: 20 }}>
        <Text style={styles.register}>
          Has an user?
          <Link href={"/"} style={styles.link}>
            Login
          </Link>
        </Text>
      </View>
    </View>
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
