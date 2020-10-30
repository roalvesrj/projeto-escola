import mock from "./mock"
import "./apps/dataView"
import "./tables/aggrid"
import "./autoComplete/autoComplete"
import "./navbar/navbarBookmarkSearch"
import "./auth/authentication"
import "./apps/userList"
mock.onAny().passThrough()
