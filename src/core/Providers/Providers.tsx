import { SafeAreaProvider } from "react-native-safe-area-context"

import { ThemeProviderApp } from "./ThemeProviderApp"

interface Props {
  children: React.ReactNode
}
export const Providers = ({ children }: Props) => {

  return (
    <ThemeProviderApp>
      <SafeAreaProvider>
        {children}
      </SafeAreaProvider>
    </ThemeProviderApp>
  )
}

