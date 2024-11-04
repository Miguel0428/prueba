import { CompositeNavigationProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Register: undefined;
    AgregarSerie: undefined;
    Plataforma: undefined;
    WatchSerie: { serieId: number };
};

export type DrawerNavProps = CompositeNavigationProp<DrawerNavigationProp<RootStackParamList>, any>;
