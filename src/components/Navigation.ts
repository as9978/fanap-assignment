import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export interface AuthNavigationProps<
  RouteName extends keyof AuthenticationRoutes
> {
  navigation: CompositeNavigationProp<
    StackNavigationProp<AuthenticationRoutes, RouteName>,
    | StackNavigationProp<AppRoutes, "User">
    | StackNavigationProp<AppRoutes, "Admin">
  >;
  route: RouteProp<AuthenticationRoutes, RouteName>;
}

export interface UserNavigationProps<RouteName extends keyof UserRoutes> {
  navigation: StackNavigationProp<UserRoutes, RouteName>;
  route: RouteProp<UserRoutes, RouteName>;
}

export interface AdminNavigationProps<RouteName extends keyof AdminRoutes> {
  navigation: StackNavigationProp<AdminRoutes, RouteName>;
  route: RouteProp<AdminRoutes, RouteName>;
}

export interface HomeNavigationProps<RouteName extends keyof HomeRoutes> {
  navigation: StackNavigationProp<HomeRoutes, RouteName>;
  route: RouteProp<HomeRoutes, RouteName>;
}

export interface ProfileNavigationProps<RouteName extends keyof ProfileRoutes> {
  navigation: CompositeNavigationProp<
    StackNavigationProp<HomeRoutes, "Profile">,
    StackNavigationProp<ProfileRoutes, RouteName>
  >;
  route: RouteProp<ProfileRoutes, RouteName>;
}

export type AppRoutes = {
  Authentication: undefined;
  User: undefined;
  Admin: undefined;
};

export type AuthenticationRoutes = {
  AuthLoading: undefined;
  Login: undefined;
  Register: undefined;
  RecoverPassword: undefined;
  ConfirmNewPassword: undefined;
};

export type UserRoutes = {
  Home: undefined;
  Chat: {
    userId: number;
    targetUserId: string;
    chatId: string;
  };
  Profile: undefined;
  EditProfile: {
    name: string;
  };
  Payments: undefined;
  Reports: undefined;
  GroupChat: {
    id: string;
  };
  Products: undefined;
  Cart: undefined;
};

export type AdminRoutes = {
  Home: undefined;
  Chat: {
    userId: number;
    targetUserId: string;
    chatId: string;
  };
  Profile: undefined;
  EditProfile: {
    name: string;
  };
  Payments: undefined;
  Reports: undefined;
  GroupChat: {
    id: string;
  };
  SplashVideo: undefined;
  Products: undefined;
};

export type HomeRoutes = {
  Home: undefined;
  Search: undefined;
  Movie: { id: number };
  Serial: { id: number; name: string; episodeId?: number };
  Series: { id: number; partId?: number };
  Profile: undefined;
  Filter: undefined;
  FilterResults: {
    genre: string;
    type: string;
    ordering: string;
  };
  SeeMore: {
    title: string;
    type: string;
    ordering: string;
  };
};

export type MyMoviesRoutes = {
  Watched: undefined;
  Bookmarked: undefined;
  Downloads: undefined;
};

export type ProfileRoutes = {
  Profile: undefined;
  EditProfile: undefined;
};
